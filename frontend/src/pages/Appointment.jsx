import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    // Fetch Doctor Information
    const fetchDocInfo = useCallback(() => {
        const foundDoc = doctors.find((doc) => doc._id === docId);
        setDocInfo(foundDoc);
    }, [doctors, docId]);

    // Fetch Available Time Slots
    const getAvailableSlots = useCallback(async () => {
        if (!docInfo) return; // prevent unnecessary execution

        const today = new Date();
        const slots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            const endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10, 0, 0);
            }

            const timeSlots = [];

            while (currentDate < endTime) {
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

                const isSlotAvailable = !(docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime));

                if (isSlotAvailable) {
                    timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            slots.push(timeSlots);
        }

        setDocSlots(slots);
    }, [docInfo]);

    // Book Appointment
    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (doctors.length > 0) fetchDocInfo();
    }, [doctors, fetchDocInfo]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo, getAvailableSlots]);

    return docInfo ? (
        <div>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <img className='bg-[#F8F8F8] border border-[#0005] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={`${docInfo.name}`} />
                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <h1 className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                        {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="Verified" />
                    </h1>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="Info" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.map((slots, index) => (
                        <div key={index} onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{slots[0] && daysOfWeek[slots[0].datetime.getDay()]}</p>
                            <p>{slots[0] && slots[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots[slotIndex]?.map((item, index) => (
                        <p key={index} onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>{item.time.toLowerCase()}</p>
                    ))}
                </div>
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;