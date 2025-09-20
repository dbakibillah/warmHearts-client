import React from 'react';
import Subscription from './components/Subscriptions';
import AppointmentForm from './components/AppointmentForm';
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