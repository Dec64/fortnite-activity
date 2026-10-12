"""Sourced Battle Royale calendar; day windows are not exact server cutover times.

See docs/season-calendar.md for sources, inclusive/exclusive bounds and conflicts.
"""
from __future__ import annotations

from datetime import datetime
from typing import Any

CALENDAR = (
    (1, "Chapter 1 · Season 1", "2017-10-26", "2017-12-14", "https://www.fortnite.com/news/fortnitemares-update-1-8-patch-notes"),
    (2, "Chapter 1 · Season 2", "2017-12-14", "2018-02-22", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (3, "Chapter 1 · Season 3", "2018-02-22", "2018-05-01", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (4, "Chapter 1 · Season 4", "2018-05-01", "2018-07-12", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (5, "Chapter 1 · Season 5", "2018-07-12", "2018-09-27", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (6, "Chapter 1 · Season 6", "2018-09-27", "2018-12-06", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (7, "Chapter 1 · Season 7", "2018-12-06", "2019-02-28", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (8, "Chapter 1 · Season 8", "2019-02-28", "2019-05-09", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (9, "Chapter 1 · Season 9", "2019-05-09", "2019-08-01", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (10, "Chapter 1 · Season X", "2019-08-01", "2019-10-14", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (11, "Chapter 2 · Season 1", "2019-10-15", "2020-02-20", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (12, "Chapter 2 · Season 2", "2020-02-20", "2020-06-17", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (13, "Chapter 2 · Season 3", "2020-06-17", "2020-08-27", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (14, "Chapter 2 · Season 4", "2020-08-27", "2020-12-02", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (15, "Chapter 2 · Season 5", "2020-12-02", "2021-03-16", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (16, "Chapter 2 · Season 6", "2021-03-16", "2021-06-08", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (17, "Chapter 2 · Season 7", "2021-06-08", "2021-09-13", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (18, "Chapter 2 · Season 8", "2021-09-13", "2021-12-05", "https://dotesports.com/fortnite/news/start-end-dates-for-all-fortnite-seasons"),
    (19, "Chapter 3 · Season 1", "2021-12-05", "2022-03-20", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (20, "Chapter 3 · Season 2", "2022-03-20", "2022-06-05", "https://www.fortnite.com/news/chapter-3-season-2"),
    (21, "Chapter 3 · Season 3", "2022-06-05", "2022-09-18", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (22, "Chapter 3 · Season 4", "2022-09-18", "2022-12-04", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (23, "Chapter 4 · Season 1", "2022-12-04", "2023-03-10", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (24, "Chapter 4 · Season 2", "2023-03-10", "2023-06-09", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (25, "Chapter 4 · Season 3", "2023-06-09", "2023-08-25", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (26, "Chapter 4 · Season 4", "2023-08-25", "2023-11-03", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (27, "Chapter 4 · OG", "2023-11-03", "2023-12-03", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (28, "Chapter 5 · Season 1", "2023-12-03", "2024-03-08", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (29, "Chapter 5 · Season 2", "2024-03-08", "2024-05-24", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (30, "Chapter 5 · Season 3", "2024-05-24", "2024-08-16", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (31, "Chapter 5 · Season 4", "2024-08-16", "2024-11-02", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (32, "Chapter 5 · Remix", "2024-11-02", "2024-12-01", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (33, "Chapter 6 · Season 1", "2024-12-01", "2025-02-21", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (34, "Chapter 6 · Season 2", "2025-02-21", "2025-05-02", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (35, "Chapter 6 · Galactic Battle", "2025-05-02", "2025-06-07", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (36, "Chapter 6 · Season 3", "2025-06-07", "2025-08-07", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (37, "Chapter 6 · Season 4", "2025-08-07", "2025-11-01", "https://www.fortnite.com/news/bad-bugs-bite-the-bullet-in-fortnite-battle-royale-shock-n-awesome"),
    (38, "Chapter 6 · The Simpsons", "2025-11-01", "2025-11-29", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (39, "Chapter 7 · Season 1", "2025-11-29", "2026-03-19", "https://www.fortnite.com/news/fortnite-battle-royale-chapter-seven-pacific-break-v39-00-update-notes"),
    (40, "Chapter 7 · Season 2", "2026-03-19", "2026-06-06", "https://ggseason.com/blog/fortnite-all-seasons-dates/"),
    (41, "Chapter 7 · Season 3", "2026-06-06", "2026-08-20", "https://prtimes.jp/main/html/rd/p/000000190.000036502.html"),
    (42, "Chapter 7 · Season 4", "2026-08-20", "2026-11-02", "https://www.fortnite.com/battle-pass"),
)


def season_catalogue(observed: list[dict[str, Any]], current: dict[str, Any] | None = None) -> list[dict[str, Any]]:
    """Merge public ranges without letting an unverified provider override the calendar."""
    result = {number: {"number": number, "name": name, "begin": begin + "T00:00:00+00:00",
                       "end": end + "T00:00:00+00:00", "precision": "day", "source": source}
              for number, name, begin, end, source in CALENDAR}
    expected = {number: dict(row) for number, row in result.items()}
    for row in [*observed, *([current] if current else [])]:
        if type(row.get("number")) is not int:
            continue
        try:
            begin, end = datetime.fromisoformat(row["begin"]), datetime.fromisoformat(row["end"])
        except (KeyError, TypeError, ValueError):
            continue
        if begin.tzinfo is None or end.tzinfo is None or begin >= end:
            continue
        existing = expected.get(row["number"])
        if existing and (abs((begin.date() - datetime.fromisoformat(existing["begin"]).date()).days) > 1
                         or abs((end.date() - datetime.fromisoformat(existing["end"]).date()).days) > 1):
            result[row["number"]] = {**existing, "date_conflict": True,
                                     "reported_begin": row["begin"], "reported_end": row["end"]}
        else:
            result[row["number"]] = {**(existing or {}), "number": row["number"],
                                     "begin": row["begin"], "end": row["end"], "precision": "timestamp",
                                     "source": "api-fortnite.com observed season"}
    return sorted(result.values(), key=lambda row: row["begin"], reverse=True)
