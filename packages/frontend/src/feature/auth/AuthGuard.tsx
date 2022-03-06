import { EmailAuthProvider, getAuth } from 'firebase/auth';
import { ReactNode, VFC } from 'react';
import {
  Props as FirebaseAuthProps,
  StyledFirebaseAuth,
} from 'react-firebaseui';
import Progress from '../../core/ui/Progress';
import { useAuthUser } from './useAuthUser';

type AuthGuardProps = {
  children: ReactNode;
};

const uiConfig: FirebaseAuthProps['uiConfig'] = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const AuthGuard: VFC<AuthGuardProps> = ({ children }) => {
  const user = useAuthUser();

  if (user === false) {
    return <Progress />;
  }

  if (!user) {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
