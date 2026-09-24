async function loadProfile() {
    const res = await fetch("/api/profile");
    const user = await res.json();

    const avatar = document.getElementById("avatar");
    avatar.src = `https://a.ppy.sh/${user.id}`;

    document.getElementById("username").textContent = user.username;
    document.getElementById("pp").textContent = Math.round(user.statistics.pp);
    document.getElementById("rank").textContent =
        "#" + user.statistics.global_rank.toLocaleString();
    document.getElementById("acc").textContent =
        user.statistics.hit_accuracy.toFixed(2) + "%";
    document.getElementById("playcount").textContent =
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