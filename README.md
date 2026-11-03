# Vandana Ramakrishnan | minimalist economist website

## Main structure

- `index.html` — clean homepage biography and headshot
- `research.html` — just paper titles (clickable) and short overviews
- Four individual paper pages — `tariff-markets.html`, `inflation-anchoring.html`, `household-tariffs.html`, `payment-frictions.html`
- `cv.html` — minimalist CV landing page, with the phrase **“You can find my CV here.”** The word “here” becomes an active Google Drive link after you provide it.
- `contact.html` — email and LinkedIn

There is no standalone Teaching page and no “Job Market Paper” heading. The white/navy appearance is unchanged.

## Add your Google Drive CV link

Upload your CV PDF to Google Drive and select **Share → General access → Anyone with the link → Viewer**. Copy the URL. In `cv-link.js`, set:

```js
window.CV_GOOGLE_DRIVE_URL = "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";
```

Replace the example with your actual share link. Keep the file public to viewers, and use Drive’s **Manage versions → Upload new version** to update the same PDF without changing the link.

## Add full research papers for inline reading

**Recommended: GitHub Pages-hosted PDFs, because they open directly inside the paper pages.** Upload PDFs into `assets/papers/` using the exact names below:

- `tariff-financial-markets.pdf` — Tariff Attention and Inflation Expectations: Evidence from Financial Markets
- `inflation-anchoring.pdf` — Inflation Expectations Anchoring and the State-Dependent Phillips Curve
- `household-tariff-expectations.pdf` — Tariff News and Household Inflation Expectations: Role of Prior Beliefs
- `payment-frictions.pdf` — Payment Frictions and Financial Integration

On your published website, clicking a paper title opens its detail page. The page has **Abstract | Paper | Executive summary** tabs. The Paper tab shows the full PDF inline once its corresponding file is uploaded. A link to open the PDF in a new tab is also provided. Before upload, visitors see a clear “not yet available” note. The tariff paper additionally has an SSRN link at https://ssrn.com/abstract=6848605.

## Add two-page executive summaries

Upload the summaries into `assets/summaries/` using these exact names:

- `tariff-financial-markets.pdf`
- `inflation-anchoring.pdf`
- `household-tariff-expectations.pdf`
- `payment-frictions.pdf`

The Executive summary tab shows the PDF inline when present. The separate `summary.html` full-page PDF reader also continues to work.

## Publish on GitHub Pages

1. Create a public repository called `YOURGITHUBUSERNAME.github.io`.
2. Upload **all files and the `assets/` folder contents** to the repository root.
3. In GitHub choose **Settings → Pages → Deploy from a branch**, set `main` and `/ (root)`, and save.
4. Visit `https://YOURGITHUBUSERNAME.github.io` after publication.

To change a paper title or abstract later, edit `research.html` and the corresponding paper HTML file. To change the Google Drive CV URL, edit only `cv-link.js`.

### Testing the PDF viewer before publication

A browser cannot reliably check PDF availability when opening an HTML file using `file://`. To preview locally, run `python3 -m http.server 8000` in the unzipped website folder, then open `http://localhost:8000/`. After publishing to GitHub Pages, inline PDF display works without extra setup in browsers with PDF support; a direct PDF link is always present as a fallback once a PDF is hosted.


## Coming soon labels

All four papers display **Coming soon.** on their Executive summary tab until the corresponding PDF is uploaded to `assets/summaries/`. The stand-alone executive summary page displays the same placeholder. The Payment Frictions paper also displays **Coming soon.** on its Paper tab until `assets/papers/payment-frictions.pdf` is uploaded. The other paper PDF tabs retain their original placeholder text. The site automatically displays PDFs instead of these messages once the files are published.


### November 2026 display changes
The grey research overviews are now upright (not italic). On each of the four paper detail pages, the visible “Abstract” tab and heading have been renamed to “Overview”; the text and viewer functionality are unchanged.
