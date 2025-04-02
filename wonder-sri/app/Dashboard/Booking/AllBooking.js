"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://wondersri-com-backend.onrender.com/api/v1/bookings/all-bookings');
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setBookings(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch bookings: ${err.message}`);
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const formatTimeSlot = (slot) => {
    const timeSlots = {
      SLOT_1: '9:00 AM - 11:00 AM',
      SLOT_2: '11:30 AM - 1:30 PM',
      SLOT_3: '2:00 PM - 4:00 PM',
      SLOT_4: '4:30 PM - 6:30 PM'
    };
    return timeSlots[slot] || slot;
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">{error}</p>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-gray-600">No bookings found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Boat</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.boatName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{booking.userEmail}</div>
                    <div>{booking.userPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString('en-US')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTimeSlot(booking.timeSlot)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{booking.bookingCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusBadgeClass(booking.status)}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooking;