import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import GoogleLogin from './GoogleLogin';
import GitHubLogin from './GitHubLogin';

const LoginContainer: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleLogOut = async () => {
        try {
            await auth.signOut();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const user_auth = getAuth();
    onAuthStateChanged(user_auth, (user: User | null) => {
        if (user) {
            setUserName(user.displayName || '');
            setIsSignedIn(true);
        } else {
            setIsSignedIn(false);
        }
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setErrorMessage(null);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [errorMessage]);

    return (
        <div>
            {isSignedIn ? (
                <div className='flex items-baseline gap-2'>
                    <p>Signed In as {userName}</p>
                    <button onClick={handleLogOut} className='py-2 px-4 rounded-md bg-black text-white flex gap-2 items-center border border-zinc-300'>
                        Sign out
                    </button>
                </div>
            ) : (
                <div className='flex flex-col items-baseline gap-2'>
                    {errorMessage && (<p className='text-red-500'>{errorMessage}</p>)}
                    <p>Sign In to leave a message!</p>
                    <div className='flex gap-2'>
                        <GoogleLogin setErrorMsg={setErrorMessage} />
                        <GitHubLogin setErrorMsg={setErrorMessage} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginContainer;