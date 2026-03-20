import React from 'react';
import { useRegister } from './hooks/useRegister';
import { FormInput } from './components/FormInput';
import { FormButton } from './components/FormButton';
import { ErrorDisplay } from './components/ErrorDisplay';

interface RegistrationFormProps {
  onToggleForm: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onToggleForm }) => {
  const {
    username,
    email,
    password,
    birthDate,
    setUsername,
    setEmail,
    setPassword,
    setBirthDate,
    handleRegister,
    loading,
    error,
  } = useRegister();

  return (
    <>
      <form onSubmit={handleRegister} className="w-full">
        <FormInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
          disabled={loading}
        />

        <FormInput
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
          disabled={loading}
        />

        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={loading}
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          disabled={loading}
        />

        <FormButton type="submit" loading={loading} loadingText="Creating Account...">
          Sign Up
        </FormButton>

        <p className="text-center mb-4 text-black">
          Already have an account?
          <span
            onClick={onToggleForm}
            className="cursor-pointer underline ml-1 text-purple hover:text-header transition-colors duration-300"
          >
            Sign in
          </span>
        </p>
      </form>

      <ErrorDisplay message={error} />
    </>
  );
};

export default RegistrationForm;