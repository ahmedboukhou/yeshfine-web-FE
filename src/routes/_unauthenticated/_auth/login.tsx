import { createFileRoute, Link } from '@tanstack/react-router';
import logo from '../../../assets/logo.svg';
import { AuthCard } from '../../../components/common/cards/AuthCard';

function RouteComponent() {
  return (
    <AuthCard>
      <div className="flex flex-col items-center">
        <img src={logo} alt="yeshfine-logo" className=" mb-9" />
        <div className="flex flex-col gap-3 text-center mb-12">
          <h3 className="tex-2xl font-bold">Select Language</h3>
          <p className="text-gray-500">
            Choose your preferred language to continue
          </p>
        </div>

        <div className="w-full flex flex-col gap-5">
          <div>
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              className="input input-box-shadow"
              placeholder="Enter"
            />
          </div>
          <div>
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-box-shadow"
              placeholder="Enter"
            />
          </div>
        </div>
      </div>
      <div className="text-right mt-2.5">
        <Link to="/forgot-password" className="link-text">
          Forgot Password
        </Link>
      </div>
      <button className="my-8 primary-btn">Log In</button>

      <p className="text-sm text-center">
        Already have an account?{' '}
        <Link to="/signup" className="link-text">
          Signup
        </Link>
      </p>
    </AuthCard>
  );
}

export const Route = createFileRoute('/_unauthenticated/_auth/login')({
  component: RouteComponent,
});

