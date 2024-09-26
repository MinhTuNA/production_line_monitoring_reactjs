
import axiosInstance from "./axiosConfig"

const getAllTables = () => {
  return axiosInstance.get("/get_tables");
}

const createTable = (tableName) =>{
  return axiosInstance.post("/create_table", {
    tableName: tableName,
  });
}

const deleteTable = (tableName) =>{
  return axiosInstance.post("/delete_table", {
    tableName: tableName,
  });
}

const getAuthToken = (tableName) => {
  return axiosInstance.get("/get_auth_token",
    {
      params: { tableName: tableName }
    }
  );
}

const getCameraId = (tableName) => {
  return axiosInstance.get("/get_camera_id",
    {
      params: { tableName: tableName }
    }
  );
}

const setCameraId = (tableName,id) => {
  return axiosInstance.post("/set_camera_id",
    {
       tableName: tableName,
       camera_id: id
    }
  );
}


const fetchAllEmployees = () => {
  return axiosInstance.get("/api/v1/employees?page=1&limit=100&sortBy=id&order=ASC");
};

const getEmployee = (employeeId) => {
  return axiosInstance.get(`/api/v1/employees/${employeeId}`);
};

const changeEmployee = (employeeId,name,phoneNumber,email,role,password) => {
  const params = new URLSearchParams();
  params.append('id', employeeId);
  params.append('name', name);
  params.append('phoneNumber', phoneNumber);
  params.append('email', email);
  params.append('role', role);
  if(password!=='') {
    params.append('pass', password);
  } 
  
  return axiosInstance.patch("/api/v1/employees", params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
};

const getDataNow = (tableNames) => {
  return axiosInstance.get("/get_data_now", {
    params: { tableNames: tableNames }, 
  });
};

const getDataDay = (tableNames) => {
  return axiosInstance.get("/get_data_day", {
    params: { tableNames: tableNames }, 
  });
};

const getDataInRange = (tableName, dateTimeStart, dateTimeEnd) => {
  return axiosInstance.get("/get_data_in_range", {
    params: {
      tableName: tableName,
      startTime: dateTimeStart /*format(dateTimeStart, "yyyy-MM-dd HH:mm:ss")*/,
      endTime: dateTimeEnd /*format(dateTimeEnd, "yyyy-MM-dd HH:mm:ss")*/,
    },
  });
};

const sendTarget = (tableName, target) => {
  return axiosInstance.post(
    "/send_target",
    {
      tableName: tableName,
      target: parseInt(target, 10),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const delEmployee = (employeeId) => {
  return axiosInstance.delete(`/api/v1/employees/${employeeId}`);
};

const addEmployee = (name, phoneNumber, email, role, password) => {
  const params = new URLSearchParams();
  params.append('name', name);
  params.append('phoneNumber', phoneNumber);
  params.append('email', email);
  params.append('role', role);
  params.append('pass', password); // Mật khẩu cần được gửi đi

  return axiosInstance.post("/api/v1/employees", params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
};

const addActual = (tableName, actual,token) => {
  const baseURL = process.env.REACT_APP_API_URL;
  return fetch(`${baseURL}/send_actual`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      tableName: tableName,
      actual: parseInt(actual, 10),
    }),
  })
  .then(response => {
    console.log('HTTP Status:', response.status);
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Error response from server:', err);
        throw new Error('Network response was not ok: ' + response.status);
      });
    }
    return response.json(); // Phân tích cú pháp phản hồi JSON
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  });
};

const login = (email, password) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  return axiosInstance.post("/api/v1/auth/login", params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
};

const getUser = () => {
  return axiosInstance.get("/api/v1/auth/profile");
}

const changeInfo = (id,phoneNumber,email,password) => {
  const params = new URLSearchParams();
  params.append('id', id);
  params.append('phoneNumber', phoneNumber);
  params.append('email', email);
  if(password!=='') {
    params.append('pass', password);
  } 
  
  return axiosInstance.patch("/api/v1/employees", params.toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
}

const register = (email,password) => {
  return axiosInstance.post("/register", {
    Email: email,
    Pass: password,
  });
}

export {
  getAllTables,
  createTable,
  deleteTable,
  fetchAllEmployees,
  getEmployee,
  changeEmployee,
  addActual,
  getDataNow,
  getDataDay,
  getDataInRange,
  sendTarget,
  delEmployee,
  addEmployee,
  login,
  getUser,
  changeInfo,
  getAuthToken,
  getCameraId,
  setCameraId,
};
