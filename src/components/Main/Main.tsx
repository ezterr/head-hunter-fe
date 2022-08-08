import { Route, Routes } from 'react-router-dom';
import { StudentCVEdit } from '../../views/StudentCVEdit/StudentCVEdit';
import { StudentCV } from '../../views/StudentCV/StudentCV';
import { Profile } from '../../views/Profile/Profile'
import { AddStudents } from '../../views/AddStudents/AddStudents'
import { AddHr } from '../../views/AddHr/AddHr'
import { Notifications } from '../../views/Notifications/Notifications'
import { NotFound } from '../../views/NotFound/NotFound'

export const Main = () => {
  return (
    <main className='main'>
      <Routes>
        {/* Ścieżki kursanta */}
        <Route path='/students/:studentId' element={<StudentCV />} />
        <Route path='/students/:studentId/edit' element={<StudentCVEdit />} />
        <Route path='/students/:studentId/edit' element={<Profile />} />

        {/* Ścieżki HRa */}
        <Route path='/students' element={<Profile />} />
        <Route path='/students-on-interview' element={<Profile />} />

        {/* Ścieżki Admina */}
        <Route path='/add-students' element={<AddStudents />} />
        <Route path='/add-hr' element={<AddHr />} />
        <Route path='/password-edit' element={<Profile />} />
        <Route path='/notifications' element={<Notifications />} />

        {/* Ścieżka 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </main>
  );
};
