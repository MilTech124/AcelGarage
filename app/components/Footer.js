
function Footer() {
  return (
    <footer className="border-b border-t">
    <div className="flex max-sm:flex-col items-center max-sm:items-center justify-around py-10 ">
        <div className="flex flex-col items-center gap-2">
            <h3>Znajdz nas na:</h3>
            <div className="flex gap-10">                    
                <a href="https://www.facebook.com/profile.php?id=100091331246314" target="_blank"><img className="hover:scale-105" width="40" src="/image/Facebook.svg" alt="facebook"/></a>
                <a href="https://www.instagram.com/acelgarage/?igshid=ZDdkNTZiNTM%3D&fbclid=IwAR3xYjLbfDeG7llEEfNn-037_1fVuecXg8sQYOJ-azelWrIZqYOJB4HXaEc" target="_blank"><img className="hover:scale-105"  width="40" src="/image/Instagram.svg" alt="insta"/></a>
            </div>
            <h3 className="pt-10">Godziny pracy:</h3>
            <p>pon.-pt. 7:30 - 19:00</p>
            <p>sob. 7:30 - 14</p>
           
        </div>
        <img src="/logo-white.jpg" width="400" className="h-full" alt="logo-white.jpg"/>
        <div className="flex flex-col items-center justify-center gap-10">
            <a href="mailto:biuro@acelgarage.pl" className="flex flex-col items-center">
                <img className="hover:scale-105" width="40"src="/image/mail.svg" alt="mail"/>
                biuro@acelgarage.pl
            </a>
            <div className="flex gap-5">
            <a href="tel:+48733003152" className="flex flex-col items-center"><img className="hover:scale-105"  width="40" src="/image/phone.svg" alt="phone"/>+48733003152</a>
            <a href="tel:+48733003192" className="flex flex-col items-center"><img className="hover:scale-105"  width="40" src="/image/phone.svg" alt="phone"/>+48733003192</a>
            </div>
            
        </div>
    </div>
  </footer>
  )
}

export default Footer