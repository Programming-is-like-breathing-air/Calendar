 "use client"
 import React from 'react';
 import MyCalendar from '../components/ui/calendar';
 import { Button } from '../components/ui/button';
 import { useToast } from '../components/ui/use-toast';
 import { Toaster } from "../components/ui/toaster";
 
 export default function App() {
   const { toast } = useToast();
 
   const handleReload = () => {
     window.location.reload(); 
   };
 
   return (
     <div style={{ position: 'relative', width: '100%', height: '100vh', textAlign: 'center' }}>
       <h1>My Calendar App</h1>
       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '50px' }}>
         <div style={{ width: '700px', height: '700px' }}>
           <MyCalendar />
           <div style={{ marginTop: '20px' }}>
              <Toaster />
             <Button 
               variant="default"
               onClick={() => {
                 toast({
                   title: "Your Event has been saved",
                 
                 });
                 handleReload(); 
               }}
             >
               Save Event
             </Button>
           </div>
           <div style={{ marginTop: '20px', textAlign: 'left' }}>
             <p>Instructions:</p>
             <ul>
               <li>Select a date to add an event.</li>
               <li>Click on an existing event to edit or delete it.</li>
             </ul>
           </div>
         </div>
       </div>
     </div>
   );
 }


