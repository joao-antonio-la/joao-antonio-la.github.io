import { readText } from "./filesystem";
import { parseProfile } from "./identity";

export const PROFILE = parseProfile(readText("~/documentos/quem-sou-eu.txt"), readText("~/manifesto.txt"));
