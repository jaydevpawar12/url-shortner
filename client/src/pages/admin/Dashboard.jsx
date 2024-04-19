import React, { useEffect, useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

import { useGetAdminUsersQuery, useLazyGetAdminUsersUrlsQuery, useUpdateAdminUsersMutation } from '../../redux/api/adminApi'

import { toast } from "react-toastify"
import { useLogoutMutation } from '../../redux/api/authApi';
const Dashboard = () => {

  const { data, isError: getisError, error: getError } = useGetAdminUsersQuery()
  const [userUrls, { data: urldata }] = useLazyGetAdminUsersUrlsQuery()
  const [updateUser, { isSuccess, isError, error }] = useUpdateAdminUsersMutation()
  const [logout] = useLogoutMutation()

  const [selectedUser, setSelectedUser] = useState()

  useEffect(() => {
    if (isSuccess) toast.success("Profile Update Success")
  }, [isSuccess])
  useEffect(() => {
    if (isError) toast.error(error)
  }, [isError])
  useEffect(() => {
    if (getisError && getError === 401) {
      toast.error("Logout Success")
      logout()
    }
  }, [getisError])

  return <>
    {/* {<pre>{JSON.stringify(urldata, null, 2)}</pre>} */}
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <UserStat />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <ul className="list-group">
            {data && data.map(item =>
              <li onClick={e => userUrls(item._id)} key={item._id}
                className='list-group-item d-flex justify-content-between '>{item.name}
                <button onClick={e => setSelectedUser(item)}
                  type="button" class="btn btn-warning  ">
                  <i className='bi bi-pencil'>
                  </i></button>
              </li>)}
          </ul>
        </div>
        <div className="col-sm-4">
          <div className=' '>
            <ul class="list-group ">
              {urldata && urldata.map(item => <li key={item._id} className='list-group-item d-flex justify-content-between'>
                {/* <span>{item.shortUrl}</span> */}
                <span>{item.longUrl}</span>
                <span className='badge text-bg-primary'>{item.count}</span>
              </li>)}

              <li className='list-group-item d-flex justify-content-between'>
                <span>url 1</span>
                <span className='badge text-bg-primary'>10</span>
              </li>
              <li class="list-group-item">url 1</li>
              <li class="list-group-item">url 2</li>

            </ul>
          </div>
        </div>




        <div className="col-sm-4">
          {
            selectedUser && <div class="card">
              <div class="card-header">{selectedUser.name}</div>

              <div class="card-body">
                <div>
                  <label for="name" class="form-label">First name</label>
                  <input onChange={e => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    value={selectedUser.name} type="text" class="form-control" id="name"
                    placeholder="Enter Your Name" />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <div>
                  <label for="email" class="form-label">email</label>
                  <input onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    value={selectedUser.email} type="text" class="form-control" id="email"
                    placeholder="Enter Your Name" />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <div class="form-check form-switch">
                  <input onChange={e => setSelectedUser({ ...selectedUser, active: e.target.checked })}
                    checked={selectedUser.active} class="form-check-input" type="checkbox" id="id" />
                  <label class="form-check-label" for="id">Account active</label>
                </div>
                <button onClick={e => {
                  updateUser(selectedUser)
                  setSelectedUser(null)
                }}

                  type="button" class="btn btn-primary">update profile</button>
              </div>
              <div class="card-footer">footer</div>
            </div>
          }
        </div>
      </div>
    </div>
  </>
}

const UserStat = () => {
  const { data: allUsers } = useGetAdminUsersQuery()
  const deactivvated = allUsers && allUsers.filter(item => !item.active).length
  const active = allUsers && allUsers.filter(item => item.active).length
  const data = {
    labels: ['De-Activated', 'Active'],
    datasets: [
      {
        label: 'User',
        data: [deactivvated, active],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return <Pie data={data} />;

}
export default Dashboard