
import AdminSignUpHeader from '@/components/admin/AdminSignUpHeader';
import AdminSignUpInfo from '@/components/admin/AdminSignUpInfo';
import AdminSignUpForm from '@/components/admin/AdminSignUpForm';

const AdminSignUp = () => {
  return (
    <div className="min-h-screen bg-civic-dark">
      <AdminSignUpHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-civic-light mb-2 font-space-grotesk">
              Admin Registration – <span className="text-civic-accent">BBMP Portal</span>
            </h1>
            <p className="text-civic-light/70">Join the civic administration team</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Info */}
            <AdminSignUpInfo />

            {/* Right Column - Registration Form */}
            <AdminSignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
