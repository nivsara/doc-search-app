from bs4 import BeautifulSoup as bs
import pandas as pd
import requests
import validators
import time
import random
from tqdm import tqdm
import os
from pathlib import Path


NIPS_BASE_URL = "https://papers.nips.cc"

REQUEST_HEADERS = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:57.0) Gecko/20100101 Firefox/57.0'}

DATA_DIR = Path(__file__).parent.parent / 'data'



def change_ip(number):
    print("Changing IP Address...")
    os.system('sudo hostname -I')
    os.system('sudo ifconfig eth0 down')
    os.system(f'sudo ifconfig eth0 192.168.1.{number}')
    os.system('sudo ifconfig eth0 up')
    print("New IP Address")
    os.system('sudo hostname -I')

def get_soup_obj(request_url: str) -> bs or None:
    """
    Gets beautiful soup object from the request_url
    :param request_url: The url to request
    :return: soup_obj: The beautiful soup object of the request_url or None if the request failed
    """
    soup_obj = None
    try:
        for retry in range(5):
            page_req = requests.get(
                url = request_url,
                headers = REQUEST_HEADERS
                )
            if page_req.status_code == "429":
                print(f"\033[1;36m\n⚠️  Too many requests - Retrying with other IP...\033[0m")
                change_ip(random.randint(1, 30))
                time.sleep(random.randint(1, 3))
                continue
            else:
                page_req.raise_for_status()
                # Parse HTML
                soup_obj = bs(page_req.text, 'html.parser')
                if not soup_obj:
                    time.sleep(random.randint(1,2))
                    continue
                else:
                    break
    except requests.HTTPError as err:
        print(f'\033[0;31m❌ Something went wrong!\033[0m', err)
    
    return soup_obj
        

def extract_data_from_paper_link(paper_link: str) -> tuple[str, str, str]:
    """
    Extracts the author names, abstract text and paper pdf link from the paper link
    :param paper_link: The link to the paper
    :return: author_names, abstract_text, paper_pdf_link
    """
    time.sleep(random.uniform(1,2)) # To avoid getting blocked by the server
    paper__bs_obj = get_soup_obj(paper_link)
    
    author_names = None
    abstract_text = None
    paper_pdf_link = None
    
    if paper__bs_obj:
        author_names = paper__bs_obj.find('h4', text='Authors').find_next_sibling('p').text
        abstract_text = paper__bs_obj.find('h4', text='Abstract').find_next_sibling('p').text
        paper_download__bs_obj = paper__bs_obj.find('a', text='Paper', attrs={'href': True})
        if paper_download__bs_obj:
            paper_pdf_link = NIPS_BASE_URL+paper_download__bs_obj['href']
    
    return author_names, abstract_text, paper_pdf_link


def process_data_and_save(papers_data: list[tuple]) -> None:
    """
    Saves the papers data in csv and json format
    :param papers_data: The list of tuples containing the papers data
    :return: None
    """
    
    conference_paper_df = pd.DataFrame(papers_data, 
                                       columns=['year', 
                                                'title', 
                                                'conference_name', 
                                                'authors', 
                                                'paper_link', 
                                                'abstract_text'])
    
    if not DATA_DIR.exists():
        os.makedirs(DATA_DIR)
        
    conference_paper_csv_path = DATA_DIR / 'nips_papers.csv'
    conference_paper_json_path = DATA_DIR / 'nips_papers.json'
        
    conference_paper_df.to_csv(conference_paper_csv_path, index=False)
    conference_paper_df.to_json(conference_paper_json_path, orient='records')
    print(f"\033[1;m Saved the data in csv and json format at {str(conference_paper_csv_path)} \
          and {str(conference_paper_json_path)} respectively \033[0m")
    

def start_crawling(conference_yearly_data: list[tuple]) -> None:
    """
    Starts the crawling process
    :param conference_yearly_data: The list of tuples containing the conference name, conference year link and conference year
    :return: None
    """
    papers_data = []
    for conference_name, conference_year_link, conference_year in conference_yearly_data:
        print("-"*50)
        print(f"\n\033[1;34m Starting scraping conference {conference_name}...\033[0m")
        year_wise__bs_obj = get_soup_obj(conference_year_link)
        paper_webpage_data = [(link.text, link["href"]) for link in year_wise__bs_obj.find_all('a', attrs={'title': 'paper title'})]
        print(f"\033[1;m Total number of papers found: {len(paper_webpage_data)}\033[0m")
        print(f"\n\033[1;35m Starting to scrape each paper... \033[0m")
        start_time = time.time()
        for paper_title, paper_sub_link in tqdm(paper_webpage_data):
            paper_link = NIPS_BASE_URL + paper_sub_link
            author_names, abstract_text, paper_pdf_link = extract_data_from_paper_link(paper_link)
            papers_data.append((conference_year, paper_title, conference_name, author_names, paper_pdf_link, abstract_text))
        print(f"\n\033[1;32m Finished scraping {len(paper_webpage_data)} papers in {time.time() - start_time} seconds\033[0m")
        
        print(f"\n\033[1;32m Finished scraping year - {conference_year}'s data \033[0m")
    print("\n\033[1;32m Finished scraping all the data \033[0m")
    process_data_and_save(papers_data)
    


if __name__ == "__main__":
    start_time = time.time()
    print(f'\n\033[1;32m Starting the crawling process...\033[0m')
    nips_homepage__bs_obj = get_soup_obj(NIPS_BASE_URL)
    print(f"\033[1;m Scraping the url {NIPS_BASE_URL}\033[0m")
    conference_yearly_data = [(link.text, NIPS_BASE_URL + link["href"], link["href"].split('/')[-1]) 
                            for link in nips_homepage__bs_obj.find_all('a') 
                            if ('/paper/' in link["href"] and not validators.url(link["href"]))]
    print(f"\033[1;m Total number of conferences found: {len(conference_yearly_data)}\033[0m")
    start_crawling(conference_yearly_data)
    print(f'\n\033[1;32m Finished the crawling process in {time.time() - start_time} seconds\033[0m')
    