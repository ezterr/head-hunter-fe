import { AddStudentsItem } from "./AddStudentsItem";
import { AddedStudent } from "./AddStudents";

interface Props {
    addedStudents: AddedStudent[];
}

export const AddStudentsList = ({ addedStudents }: Props) => {

    const addedStudentsList = () => addedStudents.map(s => <AddStudentsItem key={s.email} addedStudent={s} />);

    return (
        <tbody className="table__body">
            {addedStudentsList()}
        </tbody>
    );
};