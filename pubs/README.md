# Paper archive

Store PDFs in `journals/`, `conferences/`, `workshops/`, `posters/`, `books/`, or `theses/`.
Use lowercase filenames: `year-short-descriptive-title.pdf`. Keep published URLs stable.

The publications page is generated from `_data/publications.json`. To add a paper:

1. Add its PDF to the appropriate folder.
2. Add a JSON entry with a unique `id`, `title`, `authors`, numeric `year`, `category`, `venue`, `note`, and `files` array.
3. Each file has a root-relative `path` such as `/pubs/journals/2027-paper-title.pdf` and a readable `label` such as `View PDF`.
4. Maintain descending year order within the data file. Use multiple file entries for alternate versions of the same publication.
5. Build with Jekyll and check the PDF URL.

Book PDFs are explicitly labeled as manuscripts or full volumes when appropriate. Do not infer publication year or venue solely from the original filename.

The initial rename manifest is in `docs/paper-archive-renames.json`; SHA-256 hashes record the unchanged PDF contents.
