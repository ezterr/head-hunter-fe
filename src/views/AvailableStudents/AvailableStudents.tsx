import { AvailableStudentItem } from '../../components/AvailableStudentItem/AvailableStudentItem';
import { useSearch } from '../../hooks/useSearch';
import { OnlyUserResponse, SmallStudentResponse } from 'types';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { STUDENTS_LIMIT } from '../../utils/dataLimits';
import React, { FormEvent, useReducer, useState } from 'react';
import { studentsFilterReducer, StudentsFilterState } from '../../reducers/studentsFilterReducer';
import { StudentsList } from '../../components/StudentsList/StudentsList';
import { useResponseContext } from '../../contexts/PopupResponseContext';
import { PulseLoader } from 'react-spinners';
import { useUser } from '../../hooks/useUser';

export const studentsFilterDefault: StudentsFilterState = {
  courseEngagement: 0,
  projectDegree: 0,
  monthsOfCommercialExp: '',
  expectedContractType: [],
  courseCompletion: 0,
  canTakeApprenticeship: '',
  expectedSalary: {
    max: '',
    min: '',
  },
  teamProjectDegree: 0,
  expectedTypeWork: [],
}

export const AvailableStudents = () => {
  const user = useUser() as OnlyUserResponse;
  const [filter, dispatch] = useReducer(studentsFilterReducer, studentsFilterDefault);
  const [refreshFilter, setRefreshFilter] = useState(false);

  const handleFilterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRefreshFilter(state => !state);
  };

  const {
    amount,
    data,
    handleSearchPhraseChange,
    hasMore,
    loading,
    page,
    searchPhrase,
    setPage,
    setRefresh
  } = useSearch<SmallStudentResponse>(`user/${user.id}/hr/student`, filter, [refreshFilter]);

  const { lastDataElementRef } = useInfiniteScroll(amount, hasMore, loading, page, STUDENTS_LIMIT, setPage);

  const studentsList = () => {
    return data.map((item, i) => (
      <AvailableStudentItem
        setRefresh={setRefresh}
        item={item}
        key={item.id}
        observer={(i + 1) % STUDENTS_LIMIT === 0 ? lastDataElementRef : null}
      />
    ))
  }

  return (
    <StudentsList
      dispatch={dispatch}
      filter={filter}
      handleFilterSubmit={handleFilterSubmit}
      handleSearchPhraseChange={handleSearchPhraseChange}
      searchPhrase={searchPhrase}
    >
      <div className="hr-list__list-container">
        <ul className="hr-list__list">
          {studentsList()}
          {loading && <PulseLoader className="loading__spinner" color="#E02735"/>}
        </ul>
      </div>
    </StudentsList>
  );
};
