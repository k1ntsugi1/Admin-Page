interface ILoadingStatuses {
    [index: string]: string;
    idle: string;
    pending: string;
    fulfilled: string;
    rejected: string;
}

export const LoadingStatuses: ILoadingStatuses = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
};
