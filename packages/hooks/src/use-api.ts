import { useReducer, useRef, useCallback } from 'react';

import { StarshipsApi, starshipsApi, type ApiRequestConfig } from 'api/index';

export enum UseApiStatus {
  Pending = 'pending',
  Error = 'error',
  Success = 'success',
  Initial = 'initial',
}

export type UseApiReturnValue<
  Method extends keyof StarshipsApi,
  ResponseData = Awaited<ReturnType<StarshipsApi[Method]>>,
> = {
  makeApiCall: (...args: Parameters<StarshipsApi[Method]>) => Promise<void>;
  reset: () => void;
  cancelApiCall: () => void;
} & (
  | {
      status: UseApiStatus.Initial;
      data: undefined;
      error: null;
      pending: false;
      isSuccess: false;
      isError: false;
      isInitial: false;
      isPending: false;
    }
  | {
      status: UseApiStatus.Pending;
      data: undefined;
      error: null;
      pending: true;
      isSuccess: false;
      isError: false;
      isInitial: false;
      isPending: true;
    }
  | {
      status: UseApiStatus.Error;
      data: undefined;
      error: Error;
      pending: false;
      isSuccess: false;
      isError: true;
      isInitial: false;
      isPending: false;
    }
  | {
      status: UseApiStatus.Success;
      data: ResponseData;
      error: null;
      pending: false;
      isSuccess: true;
      isError: false;
      isInitial: false;
      isPending: false;
    }
);

export interface UseApiState<ResponseData> {
  status: UseApiStatus;
  error: Error | null;
  data: ResponseData | undefined;
  pending: boolean;
}

export type ReducerAction<ResponseData> =
  | {
      type: UseApiStatus.Initial | UseApiStatus.Pending;
    }
  | {
      type: UseApiStatus.Error;
      payload: Error;
    }
  | {
      type: UseApiStatus.Success;
      payload: ResponseData;
    };

export const DEFAULT_STATE = {
  status: UseApiStatus.Initial,
  error: null,
  data: undefined,

  pending: false,
};

export const useApi = <
  Method extends keyof StarshipsApi,
  ResponseData = Awaited<ReturnType<StarshipsApi[Method]>>,
>(
  method: Method,
  {
    onSuccess,
    onError,
    initialStatus = UseApiStatus.Initial,
  }: {
    onSuccess?: (data: ResponseData) => any;
    onError?: (error: Error) => any;
    initialStatus?: UseApiStatus;
  } = {},
) => {
  const derivedDefaultState = {
    ...DEFAULT_STATE,
    status: initialStatus,
  };

  const abortControllerRef = useRef<AbortController | null>(null);

  const [apiState, dispatch] = useReducer(
    (_: UseApiState<ResponseData>, action: ReducerAction<ResponseData>) => {
      switch (action.type) {
        case UseApiStatus.Success:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Success,
            data: action.payload,
          };

        case UseApiStatus.Error:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Error,
            error: action.payload,
          };

        case UseApiStatus.Pending:
          return {
            ...derivedDefaultState,

            status: UseApiStatus.Pending,
            pending: true,
          };

        default:
        case UseApiStatus.Initial:
          return {
            ...derivedDefaultState,
          };
      }
    },
    {
      ...derivedDefaultState,
    },
  );

  const reset = useCallback(() => {
    dispatch({
      type: UseApiStatus.Initial,
    });
  }, [dispatch]);

  const cancelApiCall = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
  }, []);

  const makeApiCall = useCallback(
    async (...args: Parameters<StarshipsApi[Method]>) => {
      cancelApiCall();

      reset();

      dispatch({
        type: UseApiStatus.Pending,
      });

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const starshipsApiMethodArgsMaxCount = starshipsApi[method].length;

      const config: ApiRequestConfig = {
        signal: abortController.signal,
      };

      if (args.length < starshipsApiMethodArgsMaxCount) {
        args.push(config);
      } else {
        const lastArg = args[starshipsApiMethodArgsMaxCount - 1];
        args[starshipsApiMethodArgsMaxCount - 1] = {
          ...(typeof lastArg === 'object' ? lastArg : {}),
          ...config,
        };
      }

      try {
        const responseData = (await starshipsApi[method](
          // @ts-expect-error - we know that the args are correct
          ...args,
        )) as ResponseData;

        await onSuccess?.(responseData);

        dispatch({
          type: UseApiStatus.Success,
          payload: responseData,
        });
      } catch (err: any) {
        if (err.name === 'AbortError') {
          reset();

          return;
        }

        await onError?.(err);

        dispatch({
          type: UseApiStatus.Error,
          payload: err,
        });
      }
    },
    [method, onSuccess, onError, dispatch, reset, cancelApiCall],
  );

  const statusFlags = Object.fromEntries(
    Object.entries(UseApiStatus).map(([statusName, statusId]) => {
      return [`is${statusName}`, apiState.status === statusId];
    }),
  );

  return {
    ...apiState,

    makeApiCall,
    reset,
    cancelApiCall,

    ...statusFlags,
  } as UseApiReturnValue<Method>;
};
