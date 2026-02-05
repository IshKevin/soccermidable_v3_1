import Link from "next/link";
export default function ThankYou() {
  return (
    <div className="container" style={{padding:"40px 0"}}>
      <div className="card" style={{padding:18,maxWidth:680}}>
        <h1 className="hTitle" style={{fontSize:34,marginTop:0}}>Thank you!</h1>
        <p className="hSub">Your message has been received. We'll reply quickly.</p>
        <Link className="btn btnPrimary" href="/en">Back to Home</Link>
      </div>
    </div>
  );
}
