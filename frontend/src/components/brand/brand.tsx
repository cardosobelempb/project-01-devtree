import BrabdImg from '@/assets/images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

type BradProps = {
    link?: string
    isLink?: boolean
}

export const Brand: React.FC<BradProps> = ({ link, isLink }) => {
    return isLink ? (
        <Link href={`/${link}`} className="flex place-self-center">
            <Image
                width={472}
                height={103}
                src={BrabdImg}
                alt=""
                priority
                className=""
            />
        </Link>
    ) : (
        <Image
            width={472}
            height={103}
            src={BrabdImg}
            alt=""
            priority
            className=""
        />
    )
}
