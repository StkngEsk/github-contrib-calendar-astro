import { useEffect, useState } from "react";
import "../styles/githubCalendar.css";

const GithubCalendar = ({ user }) => {
    const GITHUB_INIT_YEAR = 2018;
    const GITHUB_USERS = ["JeanStkng", "ChristianEsk"];
    const [actualYear, setActualYear] = useState(new Date().getFullYear());
    const [yearsByUser, setYearsByUser] = useState([]);

    useEffect(() => {
        setYearsByUser(getYearsByUser());
        getCalendar(actualYear);
    }, []);

    const getYearsByUser = () => {
        const userIndex = GITHUB_USERS.indexOf(user);
        const startYear = userIndex === 0 ? GITHUB_INIT_YEAR + 1 : GITHUB_INIT_YEAR;

        const listYear = [];
        let year = startYear;
        const length = actualYear - startYear;

        for (let i = 0; i <= length; i++) {
            listYear.push(year.toString());
            year++;
        }

        return listYear.sort((a, b) => b - a);
    };

    const getCalendar = async (year) => {
        const calendar = await (
            await fetch(
                `api/github`, {
                method: "POST",
                body: JSON.stringify({
                    user,
                    year
                }),
            }
            )
        ).json();

        document.getElementById(`txtContribLight${user}`).innerHTML =
            calendar.textContributions;
        document.getElementById(`dataSvgLight${user}`).innerHTML =
            calendar.calendar;
    };

    return (
        <div class="overflow-hidden py-12 sm:py-10">
            <div className="container mx-auto">
                <div className="w-50 flex mx-auto px-4">
                    <span className="flex-col mr-auto">
                        <a
                            className="a-link"
                            href={`https://github.com/${user}`}
                            target="_blank"
                        >
                            <i className="github"></i>
                            <p className="github-username">{user}</p>
                        </a>
                    </span>
                    <select
                        className="flex-col ml-auto years"
                        name="cars"
                        id={`cars-${user}`}
                        onChange={(event) => getCalendar(event.target.value)}
                        aria-label={`Years-for-${user}`}
                    >
                        {yearsByUser.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="dark mx-auto w-50 mt-3 mb-3 border py-2 graph-before-activity-overview px-1">
                    <b id={`txtContribLight${user}`} className="pl-4"></b>
                    <div
                        id={`dataSvgLight${user}`}
                        className="mx-md-2 mx-3 d-flex flex-column flex-items-end flex-xl-items-center overflow-hidden pt-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default GithubCalendar;
