/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import DetailsPage from './DetailsPage';
import { eventDetailsConfig, eBookDetailsConfig, courseDetailsConfig } from './DetailsPageConfig';


export const EventDetails: React.FC = () => {
    return <DetailsPage config={eventDetailsConfig} />;
};

export const EBookDetails: React.FC = () => {
    return <DetailsPage config={eBookDetailsConfig} />;
};
export const CourseDetails: React.FC = () => {
    return <DetailsPage config={courseDetailsConfig} />;
}

export const createDetailsComponent = (serviceType: 'event' | 'ebook' | 'course') => {
    const configs: Record<'event' | 'ebook' | 'course', typeof eventDetailsConfig | typeof eBookDetailsConfig | typeof courseDetailsConfig> = {
        event: eventDetailsConfig,
        ebook: eBookDetailsConfig,
        course: courseDetailsConfig,
    };

    return () => <DetailsPage config={configs[serviceType]} />;
};


