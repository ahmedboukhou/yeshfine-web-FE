import { createFileRoute, Link } from '@tanstack/react-router';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import logo from '../../../assets/logo.svg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormStatus } from 'react-dom';

import { useState } from 'react';

function RouteComponent() {
  const { pending, data } = useFormStatus();

  const [phone, setPhone] = useState('');
  return (
    <AuthCard>
      <div className="flex flex-col items-center">
        <img src={logo} alt="yeshfine-logo" className="mb-9" />
        <div className="flex flex-col gap-3 text-center mb-12">
          <h3 className="tex-2xl font-bold">Create an account</h3>
          <p className="text-gray-500">Welcome! Please enter your details.</p>
        </div>
<form>

        
        <div className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="phone" className="input-label">
              Name
            </label>
            <input
              type="phone"
              id="phone"
              className="input input-box-shadow"
              placeholder="Enter"
            />
          </div>

          <div>
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={(phone) => setPhone(phone)}
              inputClass="!w-full !input-box-shadow !rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="text"
              id="password"
              className="input input-box-shadow"
              placeholder="Enter"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <input
              type="phone"
              id="confirmPassword"
              className="input input-box-shadow"
              placeholder="Enter"
            />
          </div>
        </div>
        <button className="my-8 primary-btn">Sign Up</button>
</form>

      </div>

      <p className="text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="link-text">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}

export const Route = createFileRoute('/_unauthenticated/_auth/signup')({
  component: RouteComponent,
});
