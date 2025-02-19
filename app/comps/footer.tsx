import Link from "next/link"


const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Khaata. All rights reserved.</p>
          <p className="text-sm">
            <Link href="/terms" className="hover:underline">Terms of Service</Link> &amp; <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </footer>
    )
}

export default Footer;