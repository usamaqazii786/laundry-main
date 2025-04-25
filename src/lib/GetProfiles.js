import axiosInstance from '../components/Https/axiosInstance'

const GetProfiles = async () => {
   const response = await axiosInstance.get('user/profile');
   return response?.data;
}

export default GetProfiles


