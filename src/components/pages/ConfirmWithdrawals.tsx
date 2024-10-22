import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { verifyWithdrawFunds } from '../../api/mutation';

const ConfirmWithdrawal = () => {
    const { id } = useParams<{ id: string }>(); 

    const { mutate, isLoading: isVerifying, isError: isVerificationError, isSuccess } = useMutation(
        verifyWithdrawFunds,
        {
            onSuccess: () => {
                // Success message will be displayed on successful verification
                console.log('Verification successful!');
            },
            onError: (error) => {
                console.error('Error verifying withdrawal:', error);
                alert('Failed to verify withdrawal. Please try again.');
            },
        }
    );

    useEffect(() => {
        // Call the API to verify the withdrawal
        if (id) {
            mutate(id); // Trigger the mutation with the withdrawal ID
        }
    }, [id, mutate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {isVerifying ? (
                    <p className='dark:text-black'>Loading...</p>
                ) : (
                    <div>
                        <h1 className={`text-lg font-bold ${isVerificationError ? 'text-red-500' : 'text-green-500'}`}>
                            {isVerificationError
                                ? 'Failed to verify withdrawal'
                                : isSuccess
                                ? 'Your withdrawal request has been successfully confirmed!'
                                : 'Invalid withdrawal ID.'}
                        </h1>
                        {isVerificationError && <p className='dark:text-black'>Please contact support if you need assistance.</p>}
                        {isSuccess && <p className='dark:text-black'>Withdraw Successful Thank you for using our service!</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmWithdrawal;
