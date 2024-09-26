import { fetchTablesStart, fetchTablesSuccess, fetchTablesFailure } from '../reducers/dataReducer';
import { getAllTables } from '../../../services/API_service'; 

export const fetchTables = () => async (dispatch) => {
  dispatch(fetchTablesStart());
  try {
    const response = await getAllTables();
    dispatch(fetchTablesSuccess(response.data.tables));
  } catch (error) {
    dispatch(fetchTablesFailure(error.message));
  }
};
