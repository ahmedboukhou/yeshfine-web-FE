import { AuthCard, AuthCardHeading } from '../../components/common/cards/AuthCard';

export const SelectLanguage = () => {
	return (
		<AuthCard>
			<AuthCardHeading
				heading="Select Language"
				subHeading="Choose your preferred language to continue"
			/>
			<div>
				<div className="grid sm:grid-cols-2 gap-4">
					{/* {Object.values(Role).map((item) => (
                    <div
                      key={item}
                      onClick={() => setRole(item)}
                      className={`p-6 rounded-lg border cursor-pointer capitalize text-center relative ${
                        role === item
                          ? 'text-primary font-bold border-primary bg-primary-light-hover'
                          : 'bg-white border-gray-300 text-typography-600 font-medium'
                      }`}
                    >
                      {role === item && (
                        <div className="absolute top-2 left-2">
                          <TickIcon />
                        </div>
                      )}
                      {item}
                    </div>
                  ))} */}
				</div>
				<button className="mt-8 primary-btn w-full">Next</button>
			</div>
		</AuthCard>
	);
};
