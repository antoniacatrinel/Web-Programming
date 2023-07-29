async function logOut() {
    const response = await fetch("/battleship_war_exploded/logout", {
        method: "GET",
    });
    window.location.href = await response.json();
}