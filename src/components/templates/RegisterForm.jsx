import React from 'react';
import Header from '../molecules/Header';
import UserForm from '../organisms/forms/register/UserForm';

function RegisterForm() {
    return (
        <div className="user-form-container">
            <Header />
            <UserForm />
        </div>
    );
}

export default RegisterForm;
