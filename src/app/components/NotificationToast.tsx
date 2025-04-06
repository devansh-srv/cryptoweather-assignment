'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeNotification } from '../store/notificationSlice';

const NotificationToast = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notif) => (
        <div key={notif.id} className="p-4 text-white bg-gray-800 rounded border border-gray-700 shadow-lg">
          <div className="font-semibold">{notif.type === 'price_alert' ? 'Price Alert' : 'Weather Alert'}</div>
          <div>{notif.message}</div>
          <button
            className="mt-2 text-xs text-blue-400"
            onClick={() => dispatch(removeNotification(notif.id))}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};
export default NotificationToast;
