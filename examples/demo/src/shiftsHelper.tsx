import { SHIFT_STATUS } from './constants';
import _ from 'lodash';

const getShiftStatusText = (
    status: any,
    { totalNoOfStaff, noOfBookedStaff }: any
) => {
    let shiftStatusText = '';

    switch (status) {
        case 'offered':
        case 'browse':
        case 'applied':
        case 'upcoming': {
            _.isEqual(totalNoOfStaff, noOfBookedStaff)
                ? (shiftStatusText = SHIFT_STATUS.BOOKED.value)
                : (shiftStatusText = SHIFT_STATUS.PUBLISHED.value);

            break;
        }
        case 'ongoing': {
            shiftStatusText = SHIFT_STATUS.ONGOING.value;
            break;
        }
        case 'review_pending': {
            shiftStatusText = SHIFT_STATUS.REVIEW_PENDING.value;
            break;
        }
        case 'completed': {
            shiftStatusText = SHIFT_STATUS.COMPLETED.value;
            break;
        }
        case 'cancelled': {
            shiftStatusText = SHIFT_STATUS.CANCEL.value;
            break;
        }
        case 'past': {
            shiftStatusText = SHIFT_STATUS.PAST.value;
            break;
        }
    }
    return shiftStatusText;
};

export { getShiftStatusText };
