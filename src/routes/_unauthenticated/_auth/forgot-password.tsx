import { createFileRoute, Link } from '@tanstack/react-router';
import { AuthCard } from '../../../components/common/cards/AuthCard';
import logo from '../../../assets/logo.svg';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

import { BackIcon } from '../../../assets/icons';
import { useState } from 'react';

function RouteComponent() {
  const [phone, setPhone] = useState('');

  return (
    <AuthCard>
      <div className="flex flex-col items-center">
        <img src={logo} alt="yeshfine-logo" className=" mb-9" />
        <div className="flex flex-col gap-3 text-center mb-12">
          <h3 className="tex-2xl font-bold">Forgot Password?</h3>
          <p className="text-gray-500">
            No worries, we’ll send you reset instructions.
          </p>
        </div>

        <div className="w-full flex flex-col gap-5">
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
        </div>
      </div>
      <button className="my-8 primary-btn">Next</button>

      <Link to="/login" className="flex gap-2 items-center justify-center">
        <BackIcon />
        <span className="text-typography-700 text-sm font-semibold">
          Back to Login
        </span>
      </Link>
    </AuthCard>
  );
}

export const Route = createFileRoute('/_unauthenticated/_auth/forgot-password')(
  {
    component: RouteComponent,
  }
);
