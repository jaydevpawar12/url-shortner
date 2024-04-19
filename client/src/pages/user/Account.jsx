import React, { useEffect, useState } from 'react'
import { useAddUserMutation, useDeleteUrlMutation, useGetUsersQuery } from '../../redux/api/userApi'
import { toast } from 'react-toastify'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetPublicUrlQuery } from '../../redux/api/urlApi';
import { useLogoutMutation } from '../../redux/api/authApi';
ChartJS.register(ArcElement, Tooltip, Legend);


const Account = () => {
  return <>
    <UrlForm />
    <UrlTable />
  </>
}

const UrlForm = () => {
  const [addUrl, { isError, isSuccess, error }] = useAddUserMutation()
  const [urldata, setUrldata] = useState({})
  const handleChnage = e => {
    const { name, value } = e.target
    setUrldata({ ...urldata, [name]: value })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success("URL Create Success")
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(error)
    }
  }, [isError])

  return <>
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <div class="card">
            <div class="card-header">Short Link</div>
            <div class="card-body">
              <div className="row">
                <div className="col-sm-8">
                  <div>
                    <label htmlFor='longUrl' class="form-label">Paste a long Url</label>
                    <input onChange={handleChnage}
                      name='longUrl'
                      type="text" class="form-control" id="logngUrl" placeholder="https://www.google.com" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div>
                    <label htmlFor='label' class="form-label">Label</label>
                    <input onChange={handleChnage}
                      name='label'
                      type="text" class="form-control" id="label" placeholder="Example:instagram" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <label htmlFor='domain' class="form-label">Domain</label>
                    <input disabled type="text" class="form-control" id="domain" value="http://localhost:5173" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div>
                    <label htmlFor='shortUrl' class="form-label">Enter a back-helf</label>
                    <input
                      onChange={handleChnage}

                      name="shortUrl"
                      type="text" class="form-control" id="shortUrl" placeholder="Example:favorite-link" />
                    <div class="valid-feedback">Looks good!</div>
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="alert alert-info my-3">
                    <strong className="bi bi-magic me-3"></strong>
                    End your link with words that will make it unique
                  </div>
                </div>
              </div>
              <button onClick={e => addUrl(urldata)} type="submit" class="btn btn-primary btn-lg ">Genrate Short URL</button>

            </div>

          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <Stat />
            </div>
          </div>
        </div>

      </div>
    </div>
  </>
}

const UrlTable = () => {
  const { data } = useGetUsersQuery()
  const [deleteUrl] = useDeleteUrlMutation()
  return data && <div className="container my-3">
    <div className="table-responsive">
      <table className='table table-bordered table-dark'>
        <thead>
          <tr>
            <th>share</th>
            <th>short url</th>
            <th>label</th>
            <th>long url</th>
            <th>count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => <tr key={item._id}>
            <td>
              <a
                className='btn btn-primary'
                href={`https://url-shortner-eywt.onrender.com/visit/${item.shortUrl}`}
                target='_blank'
              >Visit</a>
            </td>
            <td>{item.shortUrl}</td>
            <td>{item.label}</td>
            <td>{item.longUrl}</td>
            <td>{item.count}</td>
            <td>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
              <button onClick={e => deleteUrl(item._id)} type="button" class=" mx-2 btn btn-danger">Delete</button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>

}

const Stat = () => {
  const { data: urlData, isError, error } = useGetUsersQuery()
  const [logout] = useLogoutMutation()

  useEffect(() => {
    if (isError) {
      if (error === 401) {
        logout()
      }
    }
  }, [isError])

  const data = {
    labels: urlData && urlData.map(item => item.label),
    datasets: [
      {
        label: '# of Votes',
        data: urlData && urlData.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
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
  return <Doughnut data={data} />;


}




export default Account