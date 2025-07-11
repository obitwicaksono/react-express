import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:4000/users");
    setUser(response.data.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-h-screen">
      <div className="flex justify-center items-center my-3">
        <Link
          to="/add"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Add New
        </Link>
      </div>
      <div className="flex justify-center items-start">
        <table className="w-1/2 border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                No
              </th>
              <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                Nama
              </th>
              <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                Email
              </th>
              <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                Alamat
              </th>
              <th className="p-3 text-left border-b border-gray-300 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
              >
                <td className="p-3 text-gray-700">{index + 1}</td>
                <td className="p-3 text-gray-700">{user.name}</td>
                <td className="p-3 text-gray-700">{user.email}</td>
                <td className="p-3 text-gray-700">{user.address}</td>
                <td>
                  <div className="flex justify-center">
                    <Link
                      to={`edit/${user.id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button onClick={()=>deleteUser(user.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
