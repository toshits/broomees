import Image from "next/image";
import styles from "./page.module.css";
import FormSection from "@/components/FormSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <FormSection />
    </main>
  );
}
