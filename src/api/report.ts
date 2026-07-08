import { XMLParser } from "fast-xml-parser"
import type { Credits } from "../model/credits"
import type { Report } from "../model/report"
import type { Entry } from "../model/entry"

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
})

export async function fetchData(loc: string, lang: string): Promise<Report | null> {
  const url = `https://aerobiologia.cat/api/v0/forecast/${loc}/${lang}/xml`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      return null;
    }

    const text = await response.text()
    const reports = parser.parse(text).reports

    const pollens: Entry[] = Object.keys(reports.taxons.pollens).map(key => {
      return {
        tag: key,
        name: reports.taxons.pollens[key][`@_${lang}`],
        latin: reports.taxons.pollens[key]["#text"],
        level: reports.report.current.pollens[key],
        forecast: reports.report.forecast.pollens[key],
      }
    })

    const spores: Entry[] = Object.keys(reports.taxons.spores).map(key => {
      return {
        tag: key,
        name: reports.taxons.spores[key][`@_${lang}`],
        latin: reports.taxons.spores[key]["#text"],
        level: reports.report.current.spores[key],
        forecast: reports.report.forecast.spores[key],
      }
    })

    const credits: Credits = {
      name: reports.credit.creditName,
      url: reports.credit.creditURL["#text"],
      license: reports.credit.license,
      terms: reports.credit.termsURL["#text"]
    }

    // Final object
    const report: Report = {
      credits: credits,
      start: reports.report.date.start,
      end: reports.report.date.end,
      pollens: pollens,
      spores: spores
    }

    return report;
  }
  catch (e) {
    console.error(e);
    return null;
  }
}
