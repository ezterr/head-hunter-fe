import { FormEvent, useState } from 'react';
import { FiKey } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import { fetchTool } from '../../utils/fetchHelpers';
import { InputPassword } from '../../components/common/InputPassword/InputPassword';

interface NewPassword {
  password: string;
  confirmPassword: string;
}

export const NewPassword = () => {

  const navigate = useNavigate();
  const { token } = useParams();

  const [newPassword, setNewPassword] = useState<NewPassword>({
    password: '',
    confirmPassword: '',
  });
  const { confirmPassword, password } = newPassword;

  const newPasswordHandler = (name: string, value: string | number) => {
    setNewPassword((newPassword) => ({
      ...newPassword,
      [name]: value,
    }));
  };

  const submitForgotPasswordHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) return console.log('Podano różne hasła.');
    const response = await fetchTool(`auth/password/${token}`, 'PUT', { newPassword: password });
    if (!response.status) return console.log('Coś się popsuło i nie było mnie słychać');
    console.log('Hasło zostało zmienione.');
    navigate('/login');
  };

  return (
    <div className='forgot'>
      <div className='forgot__icon'>
        <FiKey className='forgot__icon-key' />
      </div>
      <div className='forgot__text'>
        <h2>Ustaw nowe hasło</h2>
        <small>
          Pamiętaj, ze Twoje nowe hasło musi być inne od poprzednio ustawionego.
        </small>
      </div>
      <form className='forgot__form' onSubmit={submitForgotPasswordHandler}>
        <label htmlFor='new-password' className='forgot__form-label'>
          Hasło
        </label>
        <InputPassword
          className='forgot__form-input'
          name='password'
          placeholder='Wpisz nowe hasło'
          password={newPassword.password}
          changePassword={newPasswordHandler}
        />
        <label htmlFor='confirm_password' className='forgot_form_label'>
          Potwierdź hasło
        </label>
        <InputPassword
          className='forgot__form-input'
          name='confirmPassword'
          placeholder='Potwierdź nowe hasło'
          password={newPassword.confirmPassword}
          changePassword={newPasswordHandler}
        />
        <Button type='submit' className='forgot__form-btn' textName='Resetuj' />
      </form>
      <Link to='/login' className='forgot__link'>
        ← Wróć do logowania
      </Link>
    </div>
  );
};
