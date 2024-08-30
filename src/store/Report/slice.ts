import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReport } from '../../models/Report';
import { AxiosError } from 'axios';
import { paginator } from '../../models/Paginator';

export interface ReportState {
  report: {
    data: IReport | null;
    loading: boolean;
    error: AxiosError | null;
  };
}

const initialState: ReportState = {
  report: {
    data: null,
    loading: false,
    error: null,
  },
};

export const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getReport(state, _action: PayloadAction<paginator>) {
      state.report.loading = true;
    },
    getReportSuccess(state, action: PayloadAction<IReport>) {
      state.report.data = action.payload;
      state.report.loading = false;
    },
    getReportFailed(state, action: PayloadAction<AxiosError>) {
      state.report.error = action.payload;
      state.report.loading = false;
    },
  },
});

export const { getReport, getReportSuccess, getReportFailed } =
  ReportSlice.actions;
export default ReportSlice.reducer;
