<%*
// Begin Progress Bar

const regex = /^(\d{4}-\d{2}-\d{2})/;

let title = tp.file.title;
let progress = null;
let file_date = new Date(title.match(regex)[1] + "T00:00");

progress = tp.user.make_progress_bar(file_date.getDay(), 5, size=5, label="Progress");

if (progress) {
    tR += `${progress}\n`;
}

// End Progress Bar
%>