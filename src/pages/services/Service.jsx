import AppointmentForm from './components/AppointmentForm';
import Subscription from './components/Subscriptions';
import TermsAndConditions from './components/TermsAndCondition';

const Service = () => {
    return (
        <div>
           <Subscription/> 
           <AppointmentForm/>
           <TermsAndConditions/>
        </div>
    );
};

export default Service;