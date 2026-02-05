import LoginForm from './ui';
export default function Page(){return(<div className='card' style={{padding:18,maxWidth:520}}><h2 style={{marginTop:0}}>Admin Login</h2><LoginForm /><p className='small' style={{marginTop:12}}>Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, JWT_SECRET in .env</p></div>)}
