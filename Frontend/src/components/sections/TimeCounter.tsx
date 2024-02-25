import { log } from "console";

export default function CountDown() {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  //I'm adding this section so I don't have to keep updating this pen every year :-)
  //remove this if you don't need it
  let today: any = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy,
    dayMonth = "02/30/",
    birthday = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }
  //end

  const countDown = new Date(birthday).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      (document.getElementById("days").innerText = String(
        Math.floor(distance / day)
      )),
        (document.getElementById("hours").innerText = String(
          Math.floor((distance % day) / hour)
        )),
        (document.getElementById("minutes").innerText = String(
          Math.floor((distance % hour) / minute)
        )),
        (document.getElementById("seconds").innerText = String(
          Math.floor((distance % minute) / second)
        ));

      //do something later when date is reached
      if (distance < 0) {
        let div = document.getElementById("countdown");
        div.style.display = "none";
        clearInterval(x);
      }
      //seconds
    }, 0);

  return (
    <div>
      <div id="countdown">
        <ul className="flex gap-1 ">
          <li className="dark:bg-neutral-800 border  bg-neutral-100 p-2  rounded  ">
            <span id="days"></span>
          </li>
          <li className="dark:bg-neutral-800 border  bg-neutral-100 p-2 rounded ">
            <span id="hours"></span>
          </li>
          <li className="dark:bg-neutral-800 border  bg-neutral-100  p-2  rounded">
            <span id="minutes"></span>
          </li>
          <li className="dark:bg-neutral-800 border  bg-neutral-100 p-2 rounded">
            <span id="seconds"></span>
          </li>
        </ul>
      </div>
    </div>
  );
}
