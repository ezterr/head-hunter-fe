import { Dispatch, SetStateAction, useState } from 'react';
import { SmallStudentResponse } from 'types';
import { AvailableInfoList } from '../AvailableStudentItem/AvailableInfoList';
import { InterviewStudentHeader } from './InterviewStudentHeader';

interface Props {
  item: SmallStudentResponse;
  observer: ((node: HTMLLIElement) => void) | null;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

export const InterviewStudentItem = ({ item, observer, setRefresh }: Props) => {

  const { firstName, lastName, student } = item;
  const { canTakeApprenticeship, courseCompletion, courseEngagement, expectedContractType, expectedSalary, expectedTypeWork, monthsOfCommercialExp, projectDegree, targetWorkCity, teamProjectDegree, githubUsername } = student;
  const [isStudentInfoOpen, setIsStudentInfoOpen] = useState(false);

  return (
    <li ref={observer} className="hr-list__item">
      <InterviewStudentHeader
        firstName={firstName ?? ''}
        githubUsername={githubUsername ?? ''}
        isStudentInfoOpen={isStudentInfoOpen}
        lastName={lastName ?? ''}
        reservation={'23.04.2023'}
        id={item.id}
        setIsStudentInfoOpen={setIsStudentInfoOpen}
        setRefresh={setRefresh}
      />
      {isStudentInfoOpen && <AvailableInfoList
        canTakeApprenticeship={canTakeApprenticeship}
        courseCompletion={courseCompletion}
        courseEngagement={courseEngagement}
        expectedContractType={expectedContractType}
        expectedSalary={expectedSalary}
        expectedTypeWork={expectedTypeWork}
        monthsOfCommercialExp={monthsOfCommercialExp}
        projectDegree={projectDegree}
        targetWorkCity={targetWorkCity ?? 'Brak'}
        teamProjectDegree={teamProjectDegree}
      />}
    </li>
  );
};
