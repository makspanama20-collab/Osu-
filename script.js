async function loadProfile() {

    const res = await fetch("/api/profile");
    const user = await res.json();

    avatar.src = "https://a.ppy.sh/38993897";

    username.textContent = user.username;
    pp.textContent = Math.round(user.statistics.pp);

    rank.textContent =
        "#" + user.statistics.global_rank.toLocaleString();

    acc.textContent =
        user.statistics.hit_accuracy.toFixed(2) + "%";

    playcount.textContent =
        user.statistics.play_count.toLocaleString();
}

loadProfile();

btn.onclick = () => {
    window.open(
        "https://osu.ppy.sh/users/38993897",
        "_blank"
    );
};
document.getElementById("avatar").src =
  "https://a.ppy.sh/38993897";