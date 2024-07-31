import React, { useState } from 'react';
import Header from '../molecules/Header';
import UserForm from './UserForm';

function FormContainer() {
    return (
        <div className="user-form-container">
            <Header />
            <UserForm />
        </div>
    );
}

export default FormContainer;