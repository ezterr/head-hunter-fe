import { CreateStudentDtoInterface } from "types";

interface Props {
    addedStudent: CreateStudentDtoInterface;
}

export const AddStudentsItem = ({ addedStudent }: Props) => {

    const { bonusProjectUrls, courseCompletion, courseEngagement, email, projectDegree, teamProjectDegree } = addedStudent;

    const urlsList = () => bonusProjectUrls.map((link, i) => <a key={String(i)} href={link} target="_blank" rel="noreferrer" className="link link--block link--center">link{i + 1}</a>);

    return (
        <tr className="table__body-row">
            <td className="table__body-item">{email}</td>
            <td className="table__body-item">{courseCompletion} / 5</td>
            <td className="table__body-item">{projectDegree} / 5</td>
            <td className="table__body-item">{courseEngagement} / 5</td>
            <td className="table__body-item">{teamProjectDegree} / 5</td>
            <td className="table__body-item">{urlsList()}</td>
        </tr>
    );
};
