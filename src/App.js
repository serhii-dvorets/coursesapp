import React from 'react'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import CoursesPage from './components/pages/coursesPage/CoursesPage'
import CoursePage from './components/pages/coursePage/CoursePage'
import Layout from './components/utils/layout/Layout'

function Router () {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<CoursesPage />} />
        <Route path="course/:courseId" element={<CoursePage />} />
      </Route>
    )
  )

  return (
    <RouterProvider
      router={router}
    />
  )
}

export default Router

